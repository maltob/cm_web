# CM_Web

This project provides a web interface for ConfigMgr using the Administration API. Allowing the view of Device Collections, Apps, Deployments, etc with the existing built in Admin API and permissions.

## Deployment
 1. Download the distribution zip and extract it to C:\inetpub\wwwroot\ on a server with the SMS Provider role (Typically a Management Point)
 2. You can now access it at https://SMSProvider/cm_web - it may prompt for your ConfigMgr account credentials.

## Features
 - Device Collections
   - View a list of device collections.
   - View a list of device collection members.
 - Information
   - View list of applications and their summaries.
   - View deployments and their progress as well as the details per asset for applications and software updates.
   - View status of system components.

