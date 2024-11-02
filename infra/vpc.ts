export const vpc = new sst.aws.Vpc("EC2", {
  bastion: true,
  nat: "ec2"
});