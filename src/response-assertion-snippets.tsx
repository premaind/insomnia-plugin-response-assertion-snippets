import type ReactLib from 'react';
import FileSaver from 'file-saver';

var testsuiteswithId : Map<string,string>;
interface State {
 unitTests: {id: number, isChecked: boolean; testCase: string; code: string;}[],
 unitTestSuiteId: string
}
export function getResponseAssertionSnippetsComponent(options: {
  React: typeof ReactLib;
}): { ResponseAssertionSnippets: ReactLib.ComponentType<State> } {
  const { React } = options;
  class ResponseAssertionSnippets extends React.Component<State> {
   
    state: State = {
      unitTests: [
        {
          id:0,
          isChecked:true,
          testCase:"Assert Response header value",
          code:"const response1 = await insomnia.send();\nconst headers = JSON.parse(JSON.stringify(response1.headers));\nexpect(headers['content-type']).to.equal('application/json; charset=utf-8');"
        },
        {
          id:1,
          isChecked:true,
          testCase:"Assert Response Body Json Value",
          code:"const response = await insomnia.send();\nconst body = JSON.parse(response.data);\nexpect(body.name).to.equal('value');"
        },
        {
          id:2,
          isChecked:true,
          testCase:"Assert JSON Payload Property name",
          code:"const response = await insomnia.send();\nconst body = JSON.parse(response.data);\nexpect(body).to.have.property('url');" 
        },
        {
          id:3,
          isChecked:true,
          testCase:"Assert JSON payload string response type",
          code:"const response = await insomnia.send();\nexpect(response.data).to.be.an('string');"
        },
        {
          id:4,
          isChecked:true,
          testCase:"Assert JSON payload string response type",
          code:"const response = await insomnia.send();\nexpect(response.data).to.be.an('string');"
        },
        
        {
          id:5,
          isChecked:true,
          testCase:"Assert Response Body Json Array Value",
          code:"const response = await insomnia.send();\nconst body = JSON.parse(response.data);\nconst item = body.json[0]\nexpect(item.name).to.equal('test1');"
        },
        {
          id:6,
          isChecked:true,
          testCase:"Assert Response Body contains a string value",
          code:"const response = await insomnia.send();\nexpect(response1.data).contains('GMT');"
        },
       
        {
          id:7,
          isChecked:true,
          testCase:"Assert Response Time is less than 300ms",
          code:"const response = await insomnia.send();\nconst responseTime = JSON.parse(response1.responseTime);\nexpect(responseTime).to.be.lessThan(300);"
        }
      ],
      unitTestSuiteId: ''
    }
    toggleChange = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log("toggleChange e.target Before",e.target)
      this.setState({unitTests: this.state.unitTests.map(x => x.id === idx ? {...x, isChecked:!x.isChecked} : x)});
    }
    handleCodeChange = (idx: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      this.setState({unitTests: this.state.unitTests.map(x => x.id === idx ? {...x, code:e.target.value} : x)});
    }

    selectTestSuite = (e : any) => {
      console.log("#### idx ####", e.target.value)
      this.state.unitTestSuiteId = e.target.value
    }
    handleSubmit = () => {
        var rawFile = new XMLHttpRequest();
        var utsdata = ""
        const utsfilepath = __dirname+"../../../../"+"insomnia.UnitTest.db";
        rawFile.open("GET", utsfilepath, false);
        rawFile.onreadystatechange = function ()
        {
          if(rawFile.readyState === 4)
            {
              if(rawFile.status === 200 || rawFile.status == 0)
                {
                  utsdata = rawFile.response.trim();
                }
            }
        }
        rawFile.send(null);
        var parentId = this.state.unitTestSuiteId
        var currentDateTime = new Date();
        var resultInSeconds=currentDateTime.getTime();
        this.state.unitTests.map(testscenario =>{
        var scenario = JSON.stringify(testscenario);
        var scenarioValue = JSON.parse(scenario);
        if ( scenarioValue['isChecked'] == true) {
          const genRanHex = (size: number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
          var id = genRanHex(32);
          var testCase = scenarioValue['testCase']
          var scenarios = scenarioValue['code']
          var _id = 'ut_'+id
          var clientut = {_id: _id,
          type:'UnitTest',	
          parentId: parentId,
          modified:resultInSeconds,
          created:resultInSeconds,
          requestId:null, // This is the API request id for which this testSuite to be run
          name: testCase,
          code: scenarios
          };
          utsdata = utsdata + '\n'+ JSON.stringify(clientut)
        }
        })
       var blob = new Blob([utsdata], {type: "text/plain;charset=utf-8"});
       FileSaver.saveAs(blob, "insomnia.UnitTest.db");
    }
    render() {
      const utsfilepath = __dirname+"../../../../"+"insomnia.UnitTestSuite.db";
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", utsfilepath, false);
      rawFile.onreadystatechange = function ()
      {
        if(rawFile.readyState === 4)
          {
            if(rawFile.status === 200 || rawFile.status == 0)
              {
                var rawdata = rawFile.response;
                var unitTestSuites = rawdata.split('\n');
                testsuiteswithId = new Map();
                unitTestSuites.filter((testsuite: any) => {
                  var id : string ="",name : string =""
                  if(testsuite != "") {
                    JSON.parse(testsuite, function (key, value) {
                      if (key == "_id") {
                        id = value
                      }
                      if (key == "name") {
                        name = value
                      }
                    });  
                  }
                 if( id != "" && name != ""){
                  testsuiteswithId.set(name, id);
                 }
                })
              }
          }
      }
      rawFile.send(null);
      let testsuiteList = testsuiteswithId.size > 0
	  	&& Array.from(testsuiteswithId.entries()).map((entry) => {
      const [key, value] = entry;
        return (
          <option key={key} value={value}>{key}</option>
        )
	    }, this);
      
        return (
          // Kong Connection Details
          <form className="pad" >
            <div>
            <style>{`
              select{
                width: 120px;
                height: 30px;
                border: 1px solid #999;
                font-size: 12px;
                color: black;
                background-color: #eee;
                border-radius: 5px;
              }
            `}
            </style>
              <div className="container">
                   <strong>Choose Unit Test Suite Name : </strong>
                   <select style={{width:'50%'}} onChange={this.selectTestSuite} required>
                      <option value=''>Select Unit Test Suite Name</option>
                        {testsuiteList}
                   </select>
                   <br></br><br></br>
                    <table
                      className="table table-bordered table-hover"
                      id="tab_logic" 
                    >
                      <thead>
                        <tr>
                          <th  style={{
                               minWidth: '9rem',
                               textAlign: 'left',
                               verticalAlign: 'top',
                               color: 'black',
                               height: '50%',
                             }}> Select Required 
                          </th>
                          <th  style={{
                             width: '40%',
                             textAlign: 'left',
                             verticalAlign: 'top',
                             height: '15%',
                             color: 'black',
                            }}> Test Case 
                          </th>
                          <th  style={{
                              width: '50%',
                              textAlign: 'left',
                              verticalAlign: 'top',
                              height: '15%',
                              color: 'black',
                            }}> Code 
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                          {this.state.unitTests.map((unitTest, i) => (
                             <tr>
                             <td style={{
                              textAlign: 'center',
                              verticalAlign: 'center'
                             }}>
                            <input type="checkbox"  defaultChecked={unitTest.isChecked} onChange={this.toggleChange(i)}   />
                             </td>
                             <td style={{
                              textAlign: 'left',
                              verticalAlign: 'center'
                             }}>
                               <label id="testcase0" >{unitTest.testCase}</label>
                             </td>
                             <td style={{
                              textAlign: 'left',
                              verticalAlign: 'top'
                             }}>
                               <textarea rows={3} cols={60} onChange={this.handleCodeChange(i)} style={{
                               border:'none',
                               borderWidth: '1px',
                               borderStyle: 'groove',
                               borderRadius: '5px',
                               resize: 'none'
                                }}>
                               {unitTest.code}
                               </textarea>
                             </td>
                           </tr>
                            ))}
                         
                      </tbody>
                    </table>
                    <br></br>
                    <button style={{ backgroundColor:'black',
                    textAlign:'center',color:'white',height:35,marginLeft:640}}
                      onClick={this.handleSubmit}
                      className="btn btn-default pull-left">
                      New Test
                    </button>
                  </div>
            </div>
          </form>
        );
    }
  }

  return { ResponseAssertionSnippets };
}
