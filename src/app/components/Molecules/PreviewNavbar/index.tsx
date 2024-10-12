import { Button } from "antd";
import Link from "next/link";
import React from "react";

export default function PreviewNavbar() {
  return (
    <nav className="flex items-center justify-between gap-1 bg-white p-4 md:rounded-md">
      <Link href="/links">
        <Button color="primary" variant="outlined">
          Back to Editor
        </Button>
      </Link>

      <Link href="/share">
        <Button type="primary">ShareLink</Button>
      </Link>
    </nav>
  );
}
