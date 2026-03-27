variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "af-south-1"
}

variable "project_name" {
  description = "Project name used for naming all resources"
  type        = string
  default     = "learn2grow"
}

variable "environment" {
  description = "Deployment environment (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "key_pair_name" {
  description = "Name of the AWS key pair for SSH access to EC2 instances"
  type        = string
}

variable "db_username" {
  description = "Master username for the DocumentDB cluster"
  type        = string
  default     = "admin"
}

variable "db_password" {
  description = "Master password for the DocumentDB cluster"
  type        = string
  sensitive   = true
}
