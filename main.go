package main

import (
	"net/http"
	"os"

	"github.com/mikerybka/util"
)

func main() {
	twilioAccountSID := os.Getenv("TWILIO_ACCOUNT_SID")
	if twilioAccountSID == "" {
		panic("missing TWILIO_ACCOUNT_SID")
	}
	twilioAuthToken := os.Getenv("TWILIO_AUTH_TOKEN")
	if twilioAuthToken == "" {
		panic("missing TWILIO_AUTH_TOKEN")
	}
	twilioPhoneNumber := os.Getenv("TWILIO_PHONE_NUMBER")
	if twilioPhoneNumber == "" {
		panic("missing TWILIO_PHONE_NUMBER")
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}
	authDir := os.Getenv("AUTH_DIR")
	if authDir == "" {
		authDir = "data/auth"
	}
	dataDir := os.Getenv("DATA_DIR")
	if dataDir == "" {
		dataDir = "data/schema.cafe"
	}

	app := &util.MultiUserApp{
		Twilio: &util.TwilioClient{
			AccountSID:  twilioAccountSID,
			AuthToken:   twilioAuthToken,
			PhoneNumber: twilioPhoneNumber,
		},
		AuthFiles: &util.LocalFileSystem{
			Root: "data/auth",
		},
		App: &util.SchemaCafe{
			Data: &util.LocalFileSystem{
				Root: "data/schema.cafe",
			},
		},
	}
	err := http.ListenAndServe(":"+port, app)
	panic(err)
}
