import { glob } from "glob";
import * as cp from "node:child_process";
import * as path from "node:path";

const main = () =>
  new Promise<void>(async (resolve, reject) => {
    const packages = await glob("packages/**/package.json", {
      cwd: ".",
      ignore: "**/node_modules/**",
    }).then((packages) => packages.map((pkg) => path.dirname(pkg)));

    const parallel = parseInt(process.argv.at(2) ?? "8");

    console.log("parallel", parallel);

    let i = 0;

    let ok = 0;
    let error = 0;

    const typecheck = async (pkg: string) =>
      new Promise<void>((resolve, reject) => {
        i++;

        const process = cp.spawn("bun", ["run", "typecheck"], {
          cwd: pkg,
        });

        const logs = [];

        process.stdout.on("data", (data: Buffer) =>
          logs.push(data.toString().trim())
        );
        process.stderr.on("data", (data: Buffer) =>
          logs.push(data.toString().trim())
        );

        process.on("close", (code) => {
          if (code) {
            console.error(logs.join("\n"));

            console.error(
              `[${ok + error + 1}/${packages.length}]`,
              `[${pkg}]`,
              "error."
            );

            return reject();
          }

          console.log(
            `[${ok + error + 1}/${packages.length}]`,
            `[${pkg}]`,
            "ok."
          );

          resolve();
        });
      })
        .then(() => ok++)
        .catch(() => error++)
        .finally(() => {
          if (ok + error === packages.length) {
            if (error > 0) {
              return reject();
            }

            return resolve();
          }

          if (i < packages.length) {
            typecheck(packages[i]);
          }
        });

    for (const pkg of packages.slice(0, parallel)) {
      typecheck(pkg);
    }
  });

main()
  .then(() => console.log("ok."))
  .catch(() => process.exit(1));
