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

  config.excluded_models << Paragraph

  config.model 'Post' do
    edit do
      field :title
      field :category
      field :banner_url
      field :status, :enum do
        enum { Post::STATUSES }
      end
      # form_builder :nested_form_for
      field :paragraphs do
        partial "inline_paragraphs"
      end

      field :author
      field :created_by_id, :hidden do
        default_value { bindings[:view]._current_user.id }
      end
    end

    show do
      field :title
      field :category
      field :banner_url
      field :status
      field :paragraphs do
        pretty_value do
          bindings[:view].content_tag(:div, value.reduce(""){|m,a| m+="<p class='#{a.style}'>#{a.body}</p>"}.html_safe)
        end
      end
      field :author
    end
  end

  config.model 'User' do
    edit do
      include_fields :name, :email, :password
    end

    list do
      include_fields :name, :email, :password
    end
  end

  config.model 'Image' do
    edit do
      field :title
      field :image do
        partial "add_image"
      end
    end
  end
end
