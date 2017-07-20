# Installation

## Prerequisite

You need **npm**, **nodejs** and **bower** installed.

## Step by step

Download the application code:
```
git clone https://github.com/ealain/expense-accounts-manager.git
```

### Development installation

Install and configure the application (Bash script):
```
cd expense-accounts-manager
./install-dev.sh
```
By default, a directory *data* will be created for MongoDB. Another directory *log* will be created to store more information about the installation process. The latter may be deleted.

Follow the instructions that appear at the end of the output.

### Production installation

Install and configure the application (Bash script):
```
cd expense-accounts-manager
./install.sh
```
By default, a directory *data* will be created for MongoDB.

Follow the instructions that appear at the end of the output.
