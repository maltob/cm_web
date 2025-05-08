
export const CMRestService = {
    async getCMRestEndpoint(url: string) {
        return await fetch('/AdminService/'+url);
    },
    async postCMRestEndpoint(url: string, body: string| undefined) {
        
        if(body != undefined) {
           let sendObj = { method: "POST", body: body };
           return await fetch('/AdminService/'+url, sendObj);
        }else{
            let sendObj = { method: "POST" };
            return await fetch('/AdminService/'+url, sendObj);
        }
        
    },
    async getDeviceCollections(filter: string, top=5000, skip = 0) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_Collection?$filter=contains(Name,%27${filter}%27)%20eq%20true&$skip=${skip}&$top=${top}&$orderby=Name`)
    },

    async getDeviceCollectionMembers(collectionID: string, top=5000, skip=0) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_FullCollectionMembership?$filter=CollectionID%20eq%20%27${collectionID}%27&$skip=${skip}&$top=${top}&$orderby=Name`)
    },

    async getDeviceClientNotificationStatus(resourceID: Number) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_CN_ClientStatus?$filter=ResourceID%20eq%20${resourceID}`)
    },
    
    async getDeviceSystem(resourceID: Number) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_R_System(${resourceID})`)
    },

    async getDeviceDisks(resourceID: Number) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_G_System_DISK?$filter=ResourceID%20eq%20${resourceID}`)
    },

    async getDeviceLogicalDisk(resourceID: Number) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_G_System_LOGICAL_DISK?$filter=ResourceID%20eq%20${resourceID}`)
    },

    async getDeviceOperatingSystem(resourceID: Number) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_G_System_OPERATING_SYSTEM?$filter=ResourceID%20eq%20${resourceID}`)
    },

    async getDevicePhysicalMemory(resourceID: Number) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_G_System_PHYSICAL_MEMORY?$filter=ResourceID%20eq%20${resourceID}`)
    },

    async getDeviceNetworkAdapter(resourceID: Number) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_G_System_NETWORK_ADAPTER?$filter=ResourceID%20eq%20${resourceID}`)
    },

    async getDeviceNetworkAdapterConfiguration(resourceID: Number) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_G_System_NETWORK_ADAPTER_CONFIGURATION?$filter=ResourceID%20eq%20${resourceID}`)
    },
    async getDeviceNetworkAdapterConfigurationForAdapter(resourceID: Number, MACAddress: string) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_G_System_NETWORK_ADAPTER_CONFIGURATION?$filter=ResourceID%20eq%20${resourceID} and MACAddress eq '${MACAddress}'`)
    },

    async getDeviceVideoController(resourceID: Number) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_G_System_VIDEO_CONTROLLER?$filter=ResourceID%20eq%20${resourceID}`)
    },

    async getDeviceQuickFixEngineering(resourceID: Number) {
        // Note - This class isn't enabled by default so it likely returns empty
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_G_System_QUICK_FIX_ENGINEERING?$filter=ResourceID%20eq%20${resourceID}`)
    },

    async getDeviceOptionalFeature(resourceID: Number) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_G_System_OPTIONAL_FEATURE?$filter=ResourceID%20eq%20${resourceID}`)
    },

    async getDeviceConsoleUsers(resourceID: Number) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_G_System_SYSTEM_CONSOLE_USER?$filter=ResourceID%20eq%20${resourceID}`)
    },

    async getDeviceBIOS(resourceID: Number) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_G_System_PC_BIOS?$filter=ResourceID%20eq%20${resourceID}`)
    },

    async getDeviceAddRemove(resourceID: Number) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_G_System_ADD_REMOVE_PROGRAMS?$filter=ResourceID%20eq%20${resourceID}`)
    },

    async getDeviceAddRemove64(resourceID: Number) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_G_System_ADD_REMOVE_PROGRAMS_64?$filter=ResourceID%20eq%20${resourceID}`)
    },

    async getDeviceWindowsApps(resourceID: Number) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_G_System_WINDOWS8_APPLICATION?$filter=ResourceID%20eq%20${resourceID}`)
    },

    async getDeviceProcessor(resourceID: Number) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_G_System_PROCESSOR?$filter=ResourceID%20eq%20${resourceID}`)
    },

    async getSiteSystemState( availabilityState?: Number) {
        if(availabilityState) {
            return await CMRestService.getCMRestEndpoint(`wmi/SMS_SiteSystemSummarizer?$filter=AvailabilityState%20eq%20${availabilityState}`)
        }else{
            return await CMRestService.getCMRestEndpoint(`wmi/SMS_SiteSystemSummarizer`)
        }   
    },

    async getAvailableComponentSummaries(availabilityState: Number = 0) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_ComponentSummarizer?$filter=AvailabilityState%20eq%20${availabilityState}`)
    },

    async getDeploymentSummaries() {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_DeploymentSummary`)
    },

    async getDeploymentDetails(assignmentID: Number, appStatusType?:Number) {
        if(appStatusType) {
            return await CMRestService.getCMRestEndpoint(`wmi/SMS_AppDeploymentAssetDetails?$filter=AssignmentID%20eq%20${assignmentID} and AppStatusType eq ${appStatusType}`)
        }else{
            return await CMRestService.getCMRestEndpoint(`wmi/SMS_AppDeploymentAssetDetails?$filter=AssignmentID%20eq%20${assignmentID}`)
        }
        
    },
    async getSUMDeploymentDetails(assignmentID: Number, statusType?:Number) {
        if(statusType) {
            return await CMRestService.getCMRestEndpoint(`wmi/SMS_SUMDeploymentAssetDetails?$filter=AssignmentID%20eq%20${assignmentID} and StatusType eq ${statusType}`)
        }else{
            return await CMRestService.getCMRestEndpoint(`wmi/SMS_SUMDeploymentAssetDetails?$filter=AssignmentID%20eq%20${assignmentID}`)
        }
        
    },

    async getApplicationLatest(filter: string, top=5000, skip = 0) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_ApplicationLatest?$filter=contains(LocalizedDisplayName,%27${filter}%27)%20eq%20true&$skip=${skip}&$top=${top}&$orderby=LocalizedDisplayName`)
    },

    async refreshDeviceCollection(collectionID:string) {
        return ((await CMRestService.postCMRestEndpoint(`wmi/SMS_Collection('${collectionID}')/AdminService.RequestRefresh`,undefined)).status == 201)
    },
    
  
    

}