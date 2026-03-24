output "endpoint" {
  description = "DocumentDB cluster endpoint"
  value       = aws_docdb_cluster.main.endpoint
}

output "port" {
  description = "DocumentDB cluster port"
  value       = aws_docdb_cluster.main.port
}

output "cluster_id" {
  description = "DocumentDB cluster identifier"
  value       = aws_docdb_cluster.main.cluster_identifier
}
