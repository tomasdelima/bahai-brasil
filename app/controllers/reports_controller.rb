class ReportsController < ApplicationController
  def posts
    @posts = Post.find(JSON.parse(params[:posts]))
    begin
      Timeout::timeout(ENV["REPORT_TIMEOUT"].to_i) {
        name = "Relatório de postagens - #{Date.today.strftime("%d/%m/%Y")}"
        render(
          pdf: name,
          title: name,
          file: "reports/posts",
          encoding: 'utf-8',
          disposition: 'attachment',
          # cover: 'URL, Pathname, or raw HTML string',
          # margin: {top: 0, bottom: 0, left: 0, right: 0},
          # header: {content: render_to_string('reports/header')},
          footer: {right: '[page]'},
        )
      }
    rescue
      id = Time.now.to_i
      logger.error ">>> Error generating report (id: #{id}): #{$!.message}"
      logger.error ">>> Backtrace:\n>>>#{$!.backtrace.join("\n>>> ")}"
      render text: "An error ocurred. Please contact the system administrator with this error id: #{id}", content_type: "text/html"
    end
  end
end
