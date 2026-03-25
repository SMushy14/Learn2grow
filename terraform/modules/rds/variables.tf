variable "project_name" {
  description = "Project name"
  type        = string
}

variable "environment" {
  description = "Deployment environment"
  type        = string
}

variable "private_subnet_ids" {
  description = "List of private subnet IDs for the DocumentDB subnet group"
  type        = list(string)
}

variable "security_group_id" {
  description = "Security group ID for the DocumentDB cluster"
  type        = string
}

variable "db_username" {
  description = "Master username for DocumentDB"
  type        = string
}

variable "db_password" {
  description = "Master password for DocumentDB"
  type        = string
  sensitive   = true
}
