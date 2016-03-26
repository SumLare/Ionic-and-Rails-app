module Request
  module JsonHelpers
    def json_resp
      @json_resp ||= JSON.parse(response.body, symbolize_names: true)
    end
  end
end