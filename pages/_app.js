import React from "react";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";

import { initGA, logPageView } from "../utils/analytics";

export default class MyApp extends App {
  componentDidMount() {
    initGA();
    logPageView();
    Router.events.on("routeChangeComplete", logPageView);
  }

  render() {
    const title = "What's my Zoom theme?";
    const description =
      "A tool to help you choose a fun theme for your next Zoom meeting!";
    const imageUrl =
      "https://coffee-code-climb-avatars.s3.amazonaws.com/images/20200104-szjwq-user1-fsjal-png";
    const url = "https://whats-my-zoom-theme.now.sh/";

    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          {/* OPEN GRAPH*/}
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={imageUrl} />
          <meta property="og:url" content={url} />
          {/* TWITTER */}
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={imageUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <script
            data-ad-client="ca-pub-5191347995346485"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}
