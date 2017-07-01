class ReportsController < ApplicationController
  def posts
    @posts = Post.find(JSON.parse(params[:posts]))
    respond_to do |format|
      format.pdf {
        pdf = WickedPdf.new.pdf_from_string(render_to_string('reports/posts.pdf.erb', layout: false))
        send_data pdf, filename: "Relatório de postagens - #{Date.today.strftime("%d/%m/%Y")}.pdf", type: "application/pdf", disposition: "attachment"
      }

      format.html { render 'reports/posts.pdf' }
    end
  end
end
