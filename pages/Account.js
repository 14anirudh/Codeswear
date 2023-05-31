import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Account = () => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      router.push("/Login");
    }
  }, [router.query]);

  return <div></div>;
};

export default Account;
