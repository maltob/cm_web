
export const CMRestService = {
    async getCMRestEndpoint(url: string) {
        return await fetch('/AdminService/'+url);
    },
    async getDeviceCollections(filter: string, top=5000, skip = 0) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_Collection?$filter=contains(Name,%27${filter}%27)%20eq%20true&$skip=${skip}&$top=${top}&$orderby=Name`)
    },

    async getDeviceCollectionMembers(collectionID: string, top=5000, skip=0) {
        return await CMRestService.getCMRestEndpoint(`wmi/SMS_FullCollectionMembership?$filter=CollectionID%20eq%20%27${collectionID}%27&$skip=${skip}&$top=${top}&$orderby=Name`)
    }
}