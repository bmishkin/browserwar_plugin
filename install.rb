#Based on the install.rb of Streamlined
require 'rake'

begin
  puts "======================================================================"
  puts "Attempting to copy BrowserWar required files into your application..."
  puts "======================================================================"
  RAKE_FILE = File.join(File.dirname(__FILE__), '/tasks/browser_war_tasks.rake')
  load RAKE_FILE
  
  Rake::Task['browser_war:install_files'].invoke
  puts "======================================================================"
  puts "Success!"
  puts "======================================================================"
rescue Exception => ex
  puts "FAILED TO COPY FILES DURING BROWSERWAR INSTALL.  PLEASE RUN rake browser_war:install_files."
  puts "EXCEPTION: #{ex}"
end