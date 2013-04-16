Express Status Guard
====================

Inspirated by Haskells monad guards,
this middleware frees you from the burden of repetitive error handling in your
callbacks and let's you focus on your business logic.

Just `app.use(guard())`.

Before
------

    dbRequest.do(function (err, data) {
      if (err) return res.send(500);
      dbRequest2.do(data, function (err, data2, data3) {
        if (err) return res.status(500).send('Uh! Fail.');
        dbRequest3.do(data2, data3, function (err, data4) {
          if (err) return res.status(500).json({error: 'meeh'});
          res.json({result: data4});
      });
    });

After
-----

    dbRequest.do(res.guard(500, function (data) {
      dbRequest2.do(data, res.guard(500, 'Uh! Fail.', function (data2, data3) {
        dbRequest3.do(data2, data3, res.guard(500, {error: 'meeh'}, function (data4) {
          res.json({result: data4});
        }));
      }));
    }));
