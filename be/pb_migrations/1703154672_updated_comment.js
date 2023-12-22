/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x7oxkfhlgs39xkh")

  // remove
  collection.schema.removeField("bkg10e75")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d4vfp95i",
    "name": "parent_id",
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
  const collection = dao.findCollectionByNameOrId("x7oxkfhlgs39xkh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bkg10e75",
    "name": "parent_id",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // remove
  collection.schema.removeField("d4vfp95i")

  return dao.saveCollection(collection)
})
