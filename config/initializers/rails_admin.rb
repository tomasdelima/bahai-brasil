RailsAdmin.config do |config|
  config.authenticate_with do
    warden.authenticate! scope: :user
  end
  config.current_user_method(&:current_user)

  config.actions do
    dashboard
    index
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app
  end

  config.model 'Post' do
    edit do
      field :title
      field :status
      # form_builder :nested_form_for
      field :paragraphs do
        partial "inline_paragraphs"
      end

      field :author
    end
  end
end
