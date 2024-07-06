FROM ubuntu:latest AS builder

RUN apt update
RUN apt install -y golang

WORKDIR /root
RUN go work init

COPY . src/github.com/brass-software/schema-cafe
RUN go work use src/github.com/brass-software/schema-cafe
RUN go install github.com/brass-software/schema-cafe/cmd/server

FROM scratch

COPY --from=builder /root/go/bin/server /bin/server

CMD ["/bin/server"]
