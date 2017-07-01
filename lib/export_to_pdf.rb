require 'rails_admin/config/actions'
require 'rails_admin/config/actions/base'

module RailsAdmin
  module Config
    module Actions
      class ExportToPdf < RailsAdmin::Config::Actions::Base
        RailsAdmin::Config::Actions.register(self)

        register_instance_option :visible? do
          authorized? && bindings[:abstract_model].model_name == "Post"
        end

        register_instance_option :collection do
          true
        end

        register_instance_option :link_icon do
          'icon-download'
        end
      end
    end
  end
end
