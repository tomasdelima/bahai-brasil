class ReportsController < ApplicationController
  def posts
    @posts = Post.find(JSON.parse(params[:posts]))
    respond_to do |format|
      name = "Relatório de postagens - #{Date.today.strftime("%d/%m/%Y")}"
      format.pdf {
        render( pdf:              name,
                disposition:      'attachment',
                file:             "reports/posts",
                # save_to_file:     Rails.root.join('pdfs', "#{filename}.pdf"),
                # save_only:        false,                        # depends on :save_to_file being set first
                title:            name,
                # cover:            'URL, Pathname, or raw HTML string',
                # encoding:         'TEXT',
                # user_style_sheet: 'URL',
                # margin: {top: 0, bottom: 0, left: 0, right: 0},
                # margin: {},
                # header: {
                  # html: {
                    # template: 'reports/header',          # use :template OR :url
                  #   # layout:   'pdf_plain',             # optional, use 'pdf_plain' for a pdf_plain.html.pdf.erb file, defaults to main layout
                  #   # url:      'www.example.com',
                  #   # locals:   { foo: @bar }
                  # },
                  # center:    'TEXT',
                  # font_name: 'NAME',
                  # font_size: 10,
                  # left:      'TEXT',
                  # right:     'TEXT',
                  # spacing:   10,
                  # line:      true,
                  # content:   "<div style='color:red;'>HTML CONTENT ALREADY RENDERED</div>", # optionally you can pass plain html already rendered (useful if using pdf_from_string)
                  # content: render_to_string('reports/header')
                  # left: render_to_string('reports/header').html_safe
                # },
                footer: {right: '[page]'},
                # footer: {
                #   html: {
                #     template:'shared/footer',         # use :template OR :url
                #     layout:  'pdf_plain.html',        # optional, use 'pdf_plain' for a pdf_plain.html.pdf.erb file, defaults to main layout
                #     url:     'www.example.com',
                #     locals:  { foo: @bar }
                #   },
                #   center:    'TEXT',
                #   font_name: 'NAME',
                #   font_size: SIZE,
                #   left:      'TEXT',
                #   right:     'TEXT',
                #   spacing:   REAL,
                #   line:      true,
                #   content:   'HTML CONTENT ALREADY RENDERED', # optionally you can pass plain html already rendered (useful if using pdf_from_string)
                # }


        # pdf = WickedPdf.new.pdf_from_string(render_to_string('reports/posts.pdf.erb', layout: false))
        # send_data pdf, filename: "Relatório de postagens - #{Date.today.strftime("%d/%m/%Y")}.pdf", type: "application/pdf", disposition: "attachment"
      )}

      format.html { render 'reports/posts.pdf' }
    end
  end
end
