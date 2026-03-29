output "private_ip" {
  description = "Private IP of the app server"
  value       = aws_instance.app.private_ip
}

output "instance_id" {
  description = "Instance ID of the app server"
  value       = aws_instance.app.id
}
