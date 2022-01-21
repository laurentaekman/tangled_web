//our-domain.com/news

import Link from "next/link";
import { Fragment } from "react";

const NewsPage = () => {
  return (
    <Fragment>
      <h1>The News Page</h1>
      <ul>
        <li>
          <Link href="/art-posts/nextjs-sure-is-a-framework">
            NextJS Sure Is A Framework...
          </Link>
        </li>
        <li>
          <Link href="/art-posts/something-else">Something Else</Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default NewsPage;
