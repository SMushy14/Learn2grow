variable "project_name" {
  description = "Project name"
  type        = string
}

variable "environment" {
  description = "Deployment environment"
  type        = string
}

variable "private_subnet_id" {
  description = "ID of the private subnet to place the app server in"
  type        = string
}

variable "security_group_id" {
  description = "Security group ID for the app server"
  type        = string
}

variable "key_pair_name" {
  description = "AWS key pair name for SSH access"
  type        = string
}
