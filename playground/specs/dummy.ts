export const dummy = `
asyncapi: '2.0.0'

externalDocs:
  description: Find more info here
  url: https://www.asyncapi.com

info:
  title: Dummy example with all spec features included
  version: '0.0.1'
  description: |
    This is an example of AsyncAPI specification file that is suppose to include all possible features of the AsyncAPI specification. Do not use it on production.

    It's goal is to support development of documentation and code generation with the [AsyncAPI Generator](https://github.com/asyncapi/generator/) and [Template projects](https://github.com/search?q=topic%3Aasyncapi+topic%3Agenerator+topic%3Atemplate)
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0
  contact:
    name: API Support
    url: http://www.asyncapi.com/support
    email: info@asyncapi.io
  x-twitter: '@AsyncAPISpec'

tags:
  - name: root-tag1
    externalDocs:
      description: External docs description 1
      url: https://www.asyncapi.com/
  - name: root-tag2
    description: Description 2
    externalDocs:
      url: "https://www.asyncapi.com/"
  - name: root-tag3
  - name: root-tag4
    description: Description 4
  - name: root-tag5
    externalDocs:
      url: "https://www.asyncapi.com/"

servers:
  dummy-mqtt:
    url: mqtt://localhost
    protocol: mqtt
    description: dummy MQTT broker
    bindings:
        mqtt:
          clientId: guest
          cleanSession: true
  dummy-amqp:
    url: amqp://localhost:{port}
    protocol: amqp
    description: dummy AMQP broker
    protocolVersion: "0.9.1"
    variables:
      port:
        enum:
          - '15672'
          - '5672'
    security:
      - user-password: []
  dummy-kafka:
    url: http://localhost:{port}
    protocol: kafka
    description: dummy Kafka broker
    variables:
      port:
        default: '9092'

defaultContentType: application/json

channels:
  dummy/channel/with/{dummy}/parameter/create:
    description: Dummy channel description.
    parameters:
      dummy:
        $ref: '#/components/parameters/dummy'
    publish:
      summary: Inform whenever something dummy is created.
      description: |
        Longer description.

        Still dummy though.
      operationId: receiveNewDummyInfo
      tags:
        - name: operation-tag1
          externalDocs:
            description: External docs description 1
            url: https://www.asyncapi.com/
        - name: operation-tag2
          description: Description 2
          externalDocs:
            url: "https://www.asyncapi.com/"
        - name: operation-tag3
        - name: operation-tag4
          description: Description 4
        - name: operation-tag5
          externalDocs:
            url: "https://www.asyncapi.com/"
      traits:
        - $ref: '#/components/operationTraits/kafka'
      message:
        $ref: '#/components/messages/dummyCreated'

  dummy/channel/without/parameter:
    bindings:
      amqp:
        is: routingKey
    subscribe:
      operationId: receiveSystemInfo
      message:
        $ref: '#/components/messages/dummyInfo'

components:
  messages:
    dummyCreated:
      name: dummyCreated
      title: Dummy created message
      summary: This is just a dummy create message
      correlationId:
        description: This is a dummy correlation ID.
        location: $message.header#/correlationId
      tags:
        - name: message-tag1
          externalDocs:
            description: External docs description 1
            url: https://www.asyncapi.com/
        - name: message-tag2
          description: Description 2
          externalDocs:
            url: "https://www.asyncapi.com/"
        - name: message-tag3
        - name: message-tag4
          description: Description 4
        - name: message-tag5
          externalDocs:
            url: "https://www.asyncapi.com/"
      headers:
        type: object
        properties:
          my-custom-app-header:
            type: string
          correlationId:
            type: string
      payload:
        $ref: "#/components/schemas/dummyCreated"
    dummyInfo:
      name: dummyInfo
      title: Dummy system info
      summary: This is just a dummy info message
      correlationId:
        location: $message.header#/correlationId
      description: |
        More description for a dummy message.

        It is a dummy system info message.
      traits:
        - $ref: '#/components/messageTraits/commonHeaders'
      payload:
        $ref: "#/components/schemas/dummyInfo"
      examples:
        - headers:
            my-app-header: 12
          payload:
            prop1: option1
            sentAt: 2020-01-31T13:24:53Z
        - headers:
            my-app-header: 13
        - payload:
            prop1: option2
            sentAt: 2020-01-31T13:24:53Z
          

  schemas:
    dummyCreated:
      type: object
      required:
        - prop2
      properties:
        prop1:
          type: integer
          minimum: 0
          description: Dummy prop1
        prop2:
          type: string
          description: Dummy prop2
        sentAt:
          $ref: "#/components/schemas/sentAt"
        dummyArrayWithObject:
          $ref: "#/components/schemas/dummyArrayWithObject"
        dummyArrayWithArray:
          $ref: "#/components/schemas/dummyArrayWithArray"
        dummyObject:
          $ref: "#/components/schemas/dummyObject"
      patternProperties:
        ^S_:
          type: string
        ^I_: 
          type: integer
    dummyInfo:
      type: object
      maxProperties: 5
      required:
        - prop1
      properties:
        prop1:
          type: string
          enum:
            - option1
            - option2
          description: Dummy prop1
        sentAt:
          $ref: "#/components/schemas/sentAt"
    dummyArrayWithObject:
      type: array
      items:
        $ref: "#/components/schemas/dummyInfo"
    dummyArrayWithArray:
      type: array
      items:
        - $ref: "#/components/schemas/dummyInfo"
        - type: string
        - type: number
          multipleOf: 5
    dummyObject:
      type: object
      properties:
        dummyObjectProp1:
          $ref: "#/components/schemas/sentAt"
        dummyObjectProp2:
          $ref: "#/components/schemas/dummyRecursiveObject"
    dummyRecursiveObject:
      type: object
      properties:
        dummyRecursiveProp1:
          $ref: "#/components/schemas/dummyObject"
        dummyRecursiveProp2:
          type: string

    objectWithKey:
      type: object
      properties:
        key:
          type: string
    objectWithKey2:
      type: object
      properties:
        key2:
          type: string
    sentAt:
      type: string
      format: date-time
      description: Date and time when the message was sent.
    oneOfSchema:
      oneOf:
        - $ref: "#/components/schemas/objectWithKey"
        - $ref: "#/components/schemas/objectWithKey2"
    anyOfSchema:
      anyOf:
        - $ref: "#/components/schemas/objectWithKey"
        - $ref: "#/components/schemas/objectWithKey2"
    allOfSchema:
      allOf:
        - $ref: "#/components/schemas/objectWithKey"
        - $ref: "#/components/schemas/objectWithKey2"

  securitySchemes:
    user-password:
      type: userPassword
    apiKey:
      type: apiKey
      in: user
      description: Provide your API key as the user and leave the password empty.
    supportedOauthFlows:
      type: oauth2
      description: Flows to support OAuth 2.0
      flows:
        implicit:
          authorizationUrl: 'https://authserver.example/auth'
          scopes:
            'dummy:created': Ability to create dummy message
            'dymmy:read': Ability to read dummy info
        password:
          tokenUrl: 'https://authserver.example/token'
          scopes:
            'dummy:created': Ability to create dummy message
            'dymmy:read': Ability to read dummy info
        clientCredentials:
          tokenUrl: 'https://authserver.example/token'
          scopes:
            'dummy:created': Ability to create dummy message
            'dymmy:read': Ability to read dummy info
        authorizationCode:
          authorizationUrl: 'https://authserver.example/auth'
          tokenUrl: 'https://authserver.example/token'
          refreshUrl: 'https://authserver.example/refresh'
          scopes:
            'dummy:created': Ability to create dummy message
            'dymmy:read': Ability to read dummy info
    openIdConnectWellKnown:
      type: openIdConnect
      openIdConnectUrl: 'https://authserver.example/.well-known'

  parameters:
    dummy:
      description: The ID of the new dummy message.
      schema:
        type: string
        description: Description that not be rendered, as parameter has explicit description.

  messageTraits:
    commonHeaders:
      headers:
        type: object
        properties:
          my-app-header:
            type: integer
            minimum: 0
            maximum: 100
          correlationId:
            type: string

  operationTraits:
    kafka:
      bindings:
        kafka:
          clientId: my-app-id
`;
