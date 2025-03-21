import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
  dueDate: string;
  priority: "high" | "medium" | "low";
}

interface TasksWidgetProps {
  tasks?: Task[];
  title?: string;
  showCompleted?: boolean;
}

const TasksWidget = ({
  tasks = [
    {
      id: "1",
      title: "Update chapter membership list",
      description:
        "Review and update the membership roster for all active chapters",
      status: "in-progress",
      dueDate: "2023-06-15",
      priority: "high",
    },
    {
      id: "2",
      title: "Prepare quarterly report",
      description: "Compile engagement metrics and chapter performance data",
      status: "pending",
      dueDate: "2023-06-20",
      priority: "medium",
    },
    {
      id: "3",
      title: "Schedule leadership training",
      description: "Coordinate virtual training session for chapter leaders",
      status: "completed",
      dueDate: "2023-06-10",
      priority: "medium",
    },
    {
      id: "4",
      title: "Review event proposals",
      description:
        "Evaluate and approve upcoming event proposals from chapters",
      status: "pending",
      dueDate: "2023-06-25",
      priority: "high",
    },
  ],
  title = "My Tasks",
  showCompleted = false,
}: TasksWidgetProps) => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);

  const handleTaskStatusChange = (taskId: string) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
            }
          : task,
      ),
    );
  };

  const filteredTasks = showCompleted
    ? taskList
    : taskList.filter((task) => task.status !== "completed");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "default";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    // this is krishna
    <Card className="w-full h-full bg-white overflow-hidden border-fuchsia-100 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex justify-between items-center">
          {title}
          <span className="text-sm font-normal text-muted-foreground">
            {filteredTasks.filter((t) => t.status !== "completed").length}{" "}
            remaining
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[340px] overflow-y-auto px-6 py-2">
          {filteredTasks.length > 0 ? (
            <ul className="space-y-3">
              {filteredTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-start gap-3 p-2 rounded-md hover:bg-slate-50"
                >
                  <div className="pt-0.5">
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.status === "completed"}
                      onCheckedChange={() => handleTaskStatusChange(task.id)}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor={`task-${task.id}`}
                        className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}
                      >
                        {task.title}
                      </label>
                      <Badge
                        variant={getPriorityColor(task.priority)}
                        className="ml-auto"
                      >
                        {task.priority}
                      </Badge>
                      <span className="flex items-center">
                        {getStatusIcon(task.status)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {task.description}
                    </p>
                    <div className="text-xs text-muted-foreground mt-2">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              No tasks available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksWidget;
