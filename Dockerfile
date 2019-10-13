################### STAGE BUILDER ##############################
# Create image based on the official Node 10 image from dockerhub
FROM node:10-alpine AS builder

# ENV TERM=xterm

# If you have native dependencies, add these extra tools
RUN apk add --update --no-cache \
    python \
    python-dev \
    py-pip \
    git \
    # nano \
    # openssh-client \
    g++ \
    gcc \
    make \
    # && pip install awscli \
    && rm -rf /var/cache/apk/*

# Change directory so that our commands run inside this new directory
WORKDIR /builder

# Copy dependency definitions
COPY . /builder

# Install dependecies
RUN npm install --loglevel silly


#################### STAGE APPLICATION #########################
# Create image based on the official Node 10 image from dockerhub
FROM node:10-alpine

# Change directory so that our commands run inside this new directory
WORKDIR /workdir

# Get all the code needed to run the app
COPY --from=builder /builder /workdir

# Expose the port the app runs in
EXPOSE 3000

# 
ENTRYPOINT [ "npm", "run" ]

# Serve the app
CMD [ "start" ]