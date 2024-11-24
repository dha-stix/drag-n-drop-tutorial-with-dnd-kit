type ColumnStatus = {
    status: "new" | "open" | "closed"
}
type ColumnType = {
    title: string;
    id: ColumnStatus["status"];
    issues: IssueType[];
    bg_color: string;
}
type IssueType = {
    id: string;
    title: string;
    customer_name: string;
    customer_email?: string;
    content?: string;
    attachmentURL?: string
    messages?: Message[]
    date: string;
    status: ColumnStatus["status"];
}
interface Message {
    id: string
}