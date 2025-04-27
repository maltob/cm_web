
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
    
    async refreshDeviceCollection(collectionID:string) {
        return ((await CMRestService.postCMRestEndpoint(`wmi/SMS_Collection('${collectionID}')/AdminService.RequestRefresh`,undefined)).status == 201)
    },
}