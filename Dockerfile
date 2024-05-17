FROM golang AS builder

RUN go work init

RUN mkdir -p github.com/brass-software/schema-cafe
WORKDIR /go/src/github.com/brass-software/schema-cafe
COPY . .
RUN go work use .
RUN go build -o /bin/schema-cafe github.com/brass-software/schema-cafe

FROM debian

COPY --from=builder /bin/schema-cafe /bin/schema-cafe

CMD /bin/schema-cafe
