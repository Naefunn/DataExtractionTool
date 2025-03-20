import Link from "next/link";
import React from "react";

const header = () => {
  return (
    <nav className="container flex items-center justify-between">
      <div>
        <Link href="/">Extract</Link>
      </div>

      <div>
        <Link href="/#pricing">Pricing</Link>
      </div>

      <div>
        <Link href="/sign-in">Sign In</Link>
      </div>
    </nav>
  );
};

export default header;
