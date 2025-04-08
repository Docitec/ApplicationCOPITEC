import { EnumManager } from "@/components/enum-manager"

export default function EnumsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Enums Management</h2>
      <p className="text-muted-foreground">Manage the enumerations used throughout the application.</p>

      <EnumManager title="System" description="Manage the systems that tasks can be assigned to." />

      <EnumManager title="Execution Phase" description="Manage the phases of execution for tasks." />

      <EnumManager title="Status" description="Manage the possible statuses for tasks." />
    </div>
  )
}
