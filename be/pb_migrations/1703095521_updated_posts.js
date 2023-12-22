/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r3q10766ogl7pnp")

  // remove
  collection.schema.removeField("9bkxpz28")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "layl1dac",
    "name": "reaction",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "nvg11i33bbbfyfi",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r3q10766ogl7pnp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9bkxpz28",
    "name": "reaction",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // remove
  collection.schema.removeField("layl1dac")

  return dao.saveCollection(collection)
})
