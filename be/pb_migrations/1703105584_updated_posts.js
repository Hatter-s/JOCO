/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r3q10766ogl7pnp")

  // remove
  collection.schema.removeField("jxv6ucef")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2lq7k6zf",
    "name": "tags",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r3q10766ogl7pnp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jxv6ucef",
    "name": "tags",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // remove
  collection.schema.removeField("2lq7k6zf")

  return dao.saveCollection(collection)
})
