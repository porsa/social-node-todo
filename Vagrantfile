Vagrant.configure("2") do |config|
  config.vm.provider "virtualbox" do |v|
    v.customize ["modifyvm", :id, "--memory", "1024"]
  end

  config.vm.define :web do |config|
    config.vm.synced_folder ".", "/vagrant", :nfs => true
    config.vm.box = "raring64"
    config.vm.box_url = "http://cloud-images.ubuntu.com/vagrant/raring/current/raring-server-cloudimg-amd64-vagrant-disk1.box"
    config.vm.network :private_network, ip: "192.168.123.100"
    config.vm.provision :shell, :path => "provisioning/playbook.sh"
  end
end