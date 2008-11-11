#Copyright (c) 2008 Peter Boling and Matt Long of Sagebit LLC, released under the MIT license
module BrowserWarHelper
  def start_browser_war(settings)
    fight_str = ""
    settings[:broswers] = !settings[:broswers].blank? ? settings[:broswers] : browserwar_browsers_default
    settings[:message] = !settings[:message].blank? ? settings[:message] : browserwar_message_default
    settings[:options] = !settings[:options].blank? ? settings[:options] : browserwar_options_default

    options = options_to_javascript(settings[:options])

    settings[:browsers].each do |key, value|
      fight_str << "browserwar.fight('#{key}'#{value.nil? ? '' : ', ' + value.to_s});\n"
    end
    
    class_str = "browserwar.klass(#{options[:class]},#{options[:id]},#{options[:closeable]});\n"
    style_str = "browserwar.style(#{options[:width]},#{options[:padding]},#{options[:border]},#{options[:background]},#{options[:color]});\n"
    position_str = "browserwar.position(#{options[:top]},#{options[:left]},#{options[:z_index]});\n"
    message_str = "browserwar.message(#{settings[:message]});\n"
    
    return "<script type=\"text/javascript\">\n" + class_str + message_str + position_str + style_str + fight_str + "browserwar.run();\n</script>\n"
  end
  
  def browserwar_browsers_default
    {'Explorer' => 6}
  end
  
  def browserwar_message_default
    "'<p>This site is optimized for the <a href=\"http://www.mozilla.com/en-US/firefox/\"> Mozilla Firefox</a> browser.</p>' +
    '<p>It looks like you are using <b>' + browserwar.browser_display_name + ' ' + BrowserDetect.version + '</b> or older. To get the best experience from this site we suggest you upgrade your browser.</p>' +
    '<p>Click an image below to learn more about alternative browser options.</p>' +
    '<a href=\"http://browsehappy.com/browsers/\" title=\"Browse Happy: Switch to a safer browser today\"><img src=\"http://browsehappy.com/buttons/bh_185x75.gif\" alt=\"Browse Happy logo\" width=\"185\" height=\"75\"></a>' +
    '<p style=\"text-align: center;\"><a href=\"http://iedeathmarch.org\" title=\"IE Death March\"><img src=\"http://iedeathmarch.org/wp-content/uploads/2008/08/iedeathmarch2009badge.png\" alt=\"IE Death March\"></a></p>'"
  end
  
  #Returns a hash containing a key => value pair for every available option to the BrowserWar!
  def browserwar_options_default
    { :id => 'browser_warning',
      :class => nil,
      :closeable => true,
      :background => '#fff',
      :color => '#000',
      :top => '90px',
      :left => '0px',
      :width => '200px',
      :padding => '20px',
      :border => '8px ridge #68CCFF',
      :z_index => '200' }
  end
  
  #Converts the options hash's values to javascript
  def options_to_javascript(options)
    set_to_null = browserwar_options_default
    #Convert the passed in options to be javascript
    options.each do |key,value|
      options[key] = value.blank? ? "null" : (value == true || value == false) ? "#{value}" : "'#{value}'"
      #Any key that is defined in the options hash will not need to be set to "null", so remove it from set_to_null
      set_to_null.delete(key)
    end
    #If not all the available options were in the passed in options hash, then we need to set them to "null" 
    set_to_null.each do |key,value|
      options.merge({key => "null"})
    end
    options
  end
  
end
