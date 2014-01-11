# GeoDB

This is a hacky project to make a really basic nosql like geo database. You most probably don't want to use it, unless you're me ;)

## What?

At present this is a server and client shim on top of [rbush](https://github.com/mourner/rbush).

* You can give it a bunch of points/bounding boxes of geo "things"
* Rbush creates an r-tree (a fancy way of saying indexed store) of the points
* geodb saves the tree to disk, and provides a server interface to it over tcp
* the client can connect to the server and query for points within another bounding box

## Why?

* To learn, and for a side project.
* You really don't want to use this ;)
