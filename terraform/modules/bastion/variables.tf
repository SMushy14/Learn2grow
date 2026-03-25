variable "project_name" {
  description = "Project name"
  type        = string
}

variable "environment" {
  description = "Deployment environment"
  type        = string
}

variable "public_subnet_id" {
  description = "ID of the public subnet to place the bastion in"
  type        = string
}

variable "security_group_id" {
  description = "Security group ID for the bastion host"
  type        = string
}

variable "key_pair_name" {
  description = "AWS key pair name for SSH access"
  type        = string
}
