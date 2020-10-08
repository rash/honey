# Honey

Honey is a user bot for the [Hiven chat platform](https://hiven.io). Honey can be used to clean your messages and to find out information about users through their username.

## Requirements

In order for Honey to function correctly, the authorization token for your Hiven account is required. This must be provided through a `config.json` file.
An example of the content required in the file can be found below.

```json
{
    "hivenToken": "Your Hiven authorization token"
}
```

## Setup

Step 1: Clone the repository and install the required dependencies

```bash
git clone https://github.com/rash/honey.git
cd honey
npm install
```

Step 2: Compile the TypeScript code into JavaScript code

```bash
tsc
```

Step 3: Inside the output directory, create a file named `config.json` with your Hiven authorization token (See [Requirements](#requirements) for instructions on how to do so)

## Usage

In order to launch Honey, you must run the command `node index.js`. 
After you have done that, sending the message `honey!help` in any chat will provide a list of commands that you can use.
To run a command, simply type `honey!` and the name of the command, along with any arguments that may be necessary.

## Licensing

Shuttle is licensed under the Zero Clause BSD license. A copy of this license can be found in the LICENSE file.