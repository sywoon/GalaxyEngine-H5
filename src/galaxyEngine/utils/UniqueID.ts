
export class UniqueID
{
    private static _id: number = 10000;


    public static getID(): number
    {
        return UniqueID._id++;
    }
}