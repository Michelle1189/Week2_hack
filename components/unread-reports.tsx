import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

export function UnreadReports({ reportData }) {
  // Sort by date, newest first
  const sortedReports = [...reportData].sort(
    (a, b) => new Date(b.Report_Date).getTime() - new Date(a.Report_Date).getTime(),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unread Reports</CardTitle>
        <CardDescription>Reports that require leadership attention</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Changes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedReports.map((report, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {formatDistanceToNow(new Date(report.Report_Date), { addSuffix: true })}
                </TableCell>
                <TableCell>{report.Section}</TableCell>
                <TableCell>{report.Submitted_By}</TableCell>
                <TableCell>
                  <Badge variant="destructive">Unread</Badge>
                </TableCell>
                <TableCell>
                  {report.Changed_Since_Last_Week === "No change" ? (
                    <Badge variant="outline">No change</Badge>
                  ) : (
                    <Badge variant="secondary">{report.Changed_Since_Last_Week}</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
