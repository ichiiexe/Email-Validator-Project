import { useEffect, useState } from "react";
import React from "react";

const EmailValidator = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(null);

  const validateEmail = (email) => {
    setIsValid(null);

    if (!email) return;

    const at = (email.match(/@/g) || []).length;

    if (at !== 1) {
      setIsValid(false);
      return;
    }

    const [local, domain] = email.split("@");

    //first character check//
    if (!/^[a-zA-Z0-9]/.test(local)) {
      setIsValid(false);
      return;
    }

    //last character check//
    if (!/[a-zA-Z0-9]$/.test(local)) {
      setIsValid(false);
      return;
    }

    //consecutive special char//
    if (/[._-]{2,}/.test(local)) {
      setIsValid(false);
      return;
    }

    //check for dot exists//
    if (!domain.includes(".")) {
      setIsValid(false);
      return;
    }

    const domainParts = domain.split(".");

    //check if domain has characters that are invalid//
    if (!/^[a-zA-Z-.]*$/.test(domain)) {
      setIsValid(false);
      return;
    }

    //check if domain starts with hyphen or dot//
    if (domain.startsWith("-") || domain.startsWith(".")) {
      setIsValid(false);
      return;
    }

    //check if domain ends with hyphen or dot//
    if (domain.endsWith("-") || domain.endsWith(".")) {
      setIsValid(false);
      return;
    }

    //check if there are consecutive dots//
    if (/\.{3,}/.test(domain)) {
      setIsValid(false);
      return;
    }

    //check if there are three or more dots//
    if (/([^.]*\.){3}/.test(domain)) {
      setIsValid(false);
      return;
    }

    //check if tld is 2 characters long//
    if (domainParts[1].length < 2) {
      setIsValid(false);
      return;
    }

    //check if tld is only letters//
    if (!/^[a-zA-Z]+$/.test(domainParts[1])) {
      setError("Top-level domain must contain only letters");
      setIsValid(false);
      return;
    }

    console.log(domainParts[1]);
    setIsValid(true);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  return (
    <div className="w-full h-dvh flex">
      <div className="min-w-md m-auto p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Email Validator</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm mb-1">
            Email Address
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleChange}
            placeholder="example@domain.com"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              isValid === true
                ? "border-green-500 focus:ring-green-200"
                : isValid === false
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
          />
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600 absolute top-20 left-20">
        <p className="font-medium">Validation rules:</p>
        <p className="font-bold">Local Part -</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Contains Alphanumeric</li>
          <li>No Special Characters in the Start or End</li>
          <li>No Special Characters used consecutively</li>
        </ul>
        <p className="font-bold">Domain Part -</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>One dot to separate domain name and top level domain</li>
          <li>Contains Alphanumeric</li>
          <li>Contains hyphens and dot but not at the start or end</li>
          <li>Two characters long after the dot only with letters</li>
        </ul>
      </div>
      <footer></footer>
    </div>
  );
};

export default EmailValidator;
