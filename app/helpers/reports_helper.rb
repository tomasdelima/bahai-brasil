require 'open-uri'

module ReportsHelper
  def parse_paragraph paragraph
    remove_spaces(compileFragment(fragmentString(paragraph.body))).html_safe
  end

  def remove_spaces str
    str.gsub("\n", "<br/>").gsub("\r", "  ").gsub("\t", "  ")
  end

  def embed_remote_image(url, content_type)
    begin
      Timeout::timeout(ENV["REPORT_TIMEOUT"].to_i) {
        @asset = open(url, "r:UTF-8") { |f| f.read }
        @base64 = Base64.encode64(@asset.to_s).gsub(/\s+/, "")
        @image = "data:#{content_type};base64,#{Rack::Utils.escape(@base64)}"
      }
    rescue
      logger.error ">>> Could not download image: #{url}"
    end
    @image
  end

  def rules
    [
      {name: 'literal',   regexp: (/\[literal\:(.+)\]/),           stopRulesPropagation: true},
      {name: 'image',     regexp: (/\[image\:(.+?)\]/),            stopRulesPropagation: true},
      {name: 'url',       regexp: (/\[url\:((.+?):)?(http.+?)\]/), stopRulesPropagation: true},
      {name: 'bold',      regexp: (/\[bold:(.+)\]/)},
      {name: 'bold',      regexp: (/\*(.+?)\*/)},
      {name: 'italic',    regexp: (/\/(.+?)\//)},
      {name: 'underline', regexp: (/\_(.+?)\_/)},
    ]
  end

  def fragmentString str
    rule = firstMatchedRule(str)
    if (rule)
      index = str.index(rule[:regexp])
      length = str.match(rule[:regexp])[0].length
      before = str.slice(0, index)
      matched = str.match(rule[:regexp])
      fragmentedMatched = rule[:stopRulesPropagation] ? matched[1] : fragmentString(matched[1])
      after = str[index + length..-1]
      result = [fragmentString(before), {content: rule[:name] == 'url' ? matched : fragmentedMatched, rule: rule[:name]}, fragmentString(after)]
      result.compact().flatten()
    else
      str
    end
  end

  def firstMatchedRule str
    sortedRules = rules.map{|rule| [str.index(rule[:regexp]) || Float::INFINITY, rule]}.sort{|a, b| a[0]-b[0]}
    filteredRules = sortedRules.select{|rule| rule[0] >= 0 && rule[0] < Float::INFINITY}.map{|rule| rule[1]}
    filteredRules[0]
  end

  def compileFragment fragment
    if (fragment)
      className = fragment.class

      if (className == String)
        fragment
      elsif (className == Array)
        fragment.map{|item| compileFragment(item)}.join('')
      elsif (fragment[:rule] == 'literal')
        fragment[:content][1]
      elsif (fragment[:rule] == 'image')
        image_tag(embed_remote_image(fragment[:content], 'image/jpg'))
      elsif (fragment[:rule] == 'url')
        url = fragment[:content]
        "<a href='#{url[3]}'>#{url[2] || url[3]}</a>"
      elsif (className == Hash)
        "<span class='#{fragment[:rule]}'>#{compileFragment(fragment[:content])}</span>"
      else
        puts 'ERROR!!!: UNKNOWN FRAGMENT'
      end
    else
      nil
    end
  end
end
