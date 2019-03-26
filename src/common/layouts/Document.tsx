import { DocumentProps } from '@christophediprima/razzle-react-redux-observable-found';
import React from 'react';
import { SheetsRegistry } from 'react-jss';
import { runtimeEnv } from '../lib/config';
import { Helmet } from 'react-helmet';

const helmet = Helmet.renderStatic();

export interface DocumentExtraProps {
  styleSheets: SheetsRegistry;
}

class Document extends React.Component<DocumentProps & DocumentExtraProps> {
  public render() {
    const { assets, html, initialState, styleSheets } = this.props;
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <title>HydroScan</title>
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
          />
          {assets.client.css ? <link rel="stylesheet" href={assets.client.css} /> : ''}
          <style type="text/css" id="server-side-styles">
            {styleSheets.toString()}
          </style>
          {helmet.link.toComponent()}
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-136958988-1" />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html:
                'if(window !== "undefined"){function gtag(){window.dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","UA-136958988-1")}'
            }}
          />
        </head>
        <body {...bodyAttrs}>
          <div
            id="root"
            dangerouslySetInnerHTML={{
              __html: html
            }}
          />
          <script
            id="server-app-state"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({ initialState })
            }}
          />
          <script type="text/javascript" src={assets.client.js} defer={true} crossOrigin="anonymous" />
          <script
            id="window-env"
            dangerouslySetInnerHTML={{
              __html: 'window.env = ' + JSON.stringify(runtimeEnv)
            }}
          />
        </body>
      </html>
    );
  }
}

export default Document;
