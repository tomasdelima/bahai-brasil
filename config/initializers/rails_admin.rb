require Rails.root.join('lib', 'export_to_pdf.rb')

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

    export_to_pdf
  end

  config.excluded_models << Paragraph

  config.model 'Post' do
    edit do
      field :title
      field :banner_url
      field :category
      field :status, :enum do
        enum { Post::STATUSES }
      end
      # form_builder :nested_form_for
      field :paragraphs do
        partial "inline_paragraphs"
      end
    end

    show do
      field :title
      field :banner_url
      field :category
      field :status
      field :paragraphs do
        pretty_value do
          bindings[:view].content_tag(:div, value.reduce(""){|m,a| m+="<p class='#{a.style}'>#{a.body}</p>"}.html_safe)
        end
      end
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

  config.model 'Category' do
    edit do
      field :name
      field :icon_library, :enum do
        enum { Category::Icons.keys }
      end
      field :icon_name, :enum do
        help 'Please, first save the field "Icon Library", then edit this category again to view the possible values of this field'
        enum {
          Category::Icons[bindings[:object].icon_library] || []
        }
      end
    end
  end
end
