#Based on the install.rb of Streamlined
require 'find'

# Handle copying over the default assets, views, and layout that BrowserWar depends on.
# We don't do all this in the rake task to make things easier to test.
module BrowserWar
  class Assets
    @source = File.expand_path(File.join(File.dirname(__FILE__), '..', 'files'))
    @destination = RAILS_ROOT
    class << self 
      attr_accessor :source, :destination
    end

    # Copy the files from browser_war into the Rails project
    # Ignores any files or directories that start with a period (so .svn will get ignored),
    # also will ignore CVS metadata.
    def self.install
      paths = []
      Find.find(source) do |path|
        Find.prune if path =~ /\/\..+/
        Find.prune if path =~ /CVS/
        paths << path
      end
      paths.each do |path| 
        dest_path = path.gsub(source, destination)
        if File.directory?(path)
          FileUtils.mkdir_p(dest_path) unless File.exists?(dest_path)
        else
          FileUtils.cp(path, dest_path)
        end
      end
    rescue Exception => e
      puts "Error trying to copy files: #{e.inspect}"
      raise e
    end
    
  end  
end

namespace :browser_war do
  
  desc 'Install BrowserWar required files.'
  task :install_files do  
    BrowserWar::Assets.install
  end
  
end