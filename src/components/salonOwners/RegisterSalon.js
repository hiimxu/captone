import React, { useState } from "react";
import bgImg from "../../assets/introbg-1.jpg";

export default function RegisterSalon() {
  // const newSalon = {
  //     account_name: username,
  //     password: password,
  //     email: email,
  //     role: "salon",
  //     nameSalon: nameSalon,
  //     phone:phone,
  //     Passibility:1,
  //     TaxCode: taxCode
  // }
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nameSalon, setNameSalon] = useState("");
  const [phone, setPhone] = useState("");
  const [taxCode, setTaxCode] = useState("");

  const root = {
    textAlign: "center",
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <div style={root}>
      <h2>Become a partner of our program</h2>
      <div></div>
    </div>
  );
}
