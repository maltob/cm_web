# CM_Web

This project provides a web interface for ConfigMgr using the Administration API. Allowing the management of Device Collections, Apps, Deployments, etc without requiring an additional service to be run.

## Deployment
 1. Download the distribution zip and extract it to C:\inetpub\wwwroot\ on a server with the SMS Provider role (Typically a Management Point)
 2. You can now access it at https://<SMS Provider>/cm_web - it may prompt for your ConfigMgr account credentials.

## Features
 - Device Collections
   - View a list of device collections
   - View a list of device collection members
