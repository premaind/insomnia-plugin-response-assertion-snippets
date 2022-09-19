import axios from 'axios';
import type React from 'react';
import type ReactDOM from 'react-dom';

import { getResponseAssertionSnippetsComponent } from './response-assertion-snippets';

// This is a temporary shim until insomnia exports plugin types that plugin authors can use
export interface Context {
  store: {
    hasItem: (key: string) => Promise<boolean>;
    setItem: (key: string, value: string) => Promise<void>;
    getItem: (key: string) => Promise<string | null>;
  };
  __private: {
    axios: typeof axios;
    analytics: {
      trackSegmentEvent: (event: string, properties?: Record<string, any>) => any;
    };
    loadRendererModules: () => Promise<{
      insomniaComponents: any;
      ReactDOM: typeof ReactDOM;
      React: typeof React;
    }>;
  };
  app: {
    dialog: (message: string, root: HTMLElement, config: any) => void;
  };
}

export const workspaceActions = [
  {
    label: 'Add Response Assertion',
    hideAfterClick: true,
    action(context: Context, models: { workspace: any; }): void {
      const root = document.createElement('div');
      const { loadRendererModules } = context.__private;
      loadRendererModules().then(({ React, ReactDOM }) => {
        const { ResponseAssertionSnippets } = getResponseAssertionSnippetsComponent({ React });
        console.log("######## models.workspace",models.workspace)
        ReactDOM.render(
          <ResponseAssertionSnippets unitTests={[]} unitTestSuiteId={''} />,
          root,
        );

        context.app.dialog('Response Assertion Snippets', root, {
          onHide(): void {
            ReactDOM.unmountComponentAtNode(root);
          },
        });
      });
    },
  },
];
