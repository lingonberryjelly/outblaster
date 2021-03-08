
   const PI2 = Math.PI*2;
   const PI = Math.PI;
   const halfPI = Math.PI*.5;



   function arrayRotate(arr, count) {
      count -= arr.length * Math.floor(count / arr.length)
      arr.push.apply(arr, arr.splice(0, count))
      return arr
   }


   function mix(val,to,by){
      return(val+(to-val)*by);
   }


   function mix_vec3(val,to,by){
      var retvar = [
                     val[0]+(to[0]-val[0])*by,
                     val[1]+(to[1]-val[1])*by,
                     val[2]+(to[2]-val[2])*by
                   ];
      return(retvar);
   }

   function mix_vec(val,to,by){
      var retvar = [];

      for(var i=0;i<val.length;i++){
         retvar[i] = val[i]+(to[i]-val[i])*by;
      }

      return(retvar);
   }

   function mix_rad(val,to,by){

      if(to-val>Math.PI){
         to-=Math.PI*2;
      }
      else if(to-val<-Math.PI){
         to+=Math.PI*2;
      }

      return(val+(to-val)*by);
   }


   function normalize(v){
      var t = v[0]*v[0] + v[1]*v[1] + v[2]*v[2];

      if(t > 0.0){
         var dist=1.0/Math.sqrt(t);
         v[0]*=dist;
         v[1]*=dist;
         v[2]*=dist;
      }

      return(v);
   }


   function length(v){
      return(Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]));
   }
   function length2d(v){
      return(Math.sqrt(v[0]*v[0]+v[1]*v[1]));
   }

   function length2d_sqrd(v){
      return(v[0]*v[0]+v[1]*v[1]);
   }

   function normalize2d(v){
      var t = v[0]*v[0] + v[1]*v[1];

      if(t > 0.001){
         var dist=1.0/Math.sqrt(t);
         v[0]*=dist;
         v[1]*=dist;
      }

      return(v);
   }

   function dotp(v1,v2){
      var retvar = 0;
      for(var i=0;i<v1.length;i++){
         retvar += v1[i]*v2[i];
      }
      return(retvar);
   }


   function dotp3d(v1,v2){
      return( v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2] );
   }

   function crossp(v1,v2,v3){
      var tx=(v1[1]*v2[2]) - (v1[2]*v2[1]);
      var ty=(v1[2]*v2[0]) - (v1[0]*v2[2]);
      var tz=(v1[0]*v2[1]) - (v2[0]*v1[1]);
      var t=(tx)*(tx)+(ty)*(ty)+(tz)*(tz);
      if(t>0.0){
         var dist=Math.sqrt(t);
         tx/=dist;
         ty/=dist;
         tz/=dist;
      }
      v3[0]=tx;
      v3[1]=ty;
      v3[2]=tz;
   }

   function reflect3d(v,n){
      var td2 = -2*dotp3d(v,n);
      var retvec = [];

      for(var i=0;i<3;i++){
         retvec[i] = td2 * n[i] + v[i];
      }

      return(retvec);
   }

   function interpolate(val,to,by){
      var s = by;
      if(val!=to){
         if(val<to){
            val += s;
            if(val > to){
               val = to;
            }
         }
         else if(val>to){
            val -= s;
            if(val < to){
               val = to;
            }
         }
      }

      return(val);
   }


   function interpolate_v(val,to,by){
      var rvec = [];
      for(var i = 0; i < val.length; i++){
         rvec[i] = interpolate(val[i],to[i],by);
      }
      return(rvec);
   }

   function interpolate_len(val,to,by){
      var s = by*Math.abs(val-to);
      if(val!=to){
         if(val<to){
            val += s;
            if(val > to){
               val = to;
            }
         }
         else if(val>to){
            val -= s;
            if(val < to){
               val = to;
            }
         }
      }

      return(val);
   }

   function mix_rad(val,to,by){

      if(to-val>Math.PI){
         to-=Math.PI*2;
      }
      else if(to-val<-Math.PI){
         to+=Math.PI*2;
      }

      return(val+(to-val)*by);
   }


   function interpolate_rad(val,to,by){

      if(to-val>Math.PI){
         to-=Math.PI*2;
      }
      else if(to-val<-Math.PI){
         to+=Math.PI*2;
      }

      if(val!=to){
         if(val<to){
            val += by;
            if(val > to){
               val = to;
            }
         }
         else if(val>to){
            val -= by;
            if(val < to){
               val = to;
            }
         }
      }

      return(val);
   }

   function safe_mod(x,y){
      return(((x%y)+y)%y);
   }

   function clamp(a,b,c){
      return(Math.min(Math.max(a,b),c));
   }


   function clamp_v(a,b,c){
      for(var i=0;i<a.length;i++){
         a[i] = clamp(a[i],b,c);
      }
      return(a);
   }

   function color_saturation(c,a){
      if(a>=0){
         var maxc = Math.max(c[0],Math.max(c[1],c[2]));
         var minc = Math.min(c[0],Math.min(c[1],c[2]));
         var cdiff = maxc-minc;
         var inva = 1-a;

         if(Math.abs(cdiff) < .01){
            return(c);
         }

         return([
               ((c[0]-minc)/cdiff)*maxc*a+c[0]*inva,
               ((c[1]-minc)/cdiff)*maxc*a+c[1]*inva,
               ((c[2]-minc)/cdiff)*maxc*a+c[2]*inva
               ]);
      }
      else{
         a *= -1;
         var inva = 1-a;

         var avg = clamp((c[0]+c[1]+c[2])/3,0,1);

         return([
               avg*a+c[0]*inva,
               avg*a+c[1]*inva,
               avg*a+c[2]*inva
               ]);
      }
   }


   function tricheck(tri,p){//(intPoint s, intPoint a, intPoint b, intPoint c){
      var as_x = p[0]-tri[0][0];
      var as_y = p[1]-tri[0][1];

      var s_ab = (((tri[1][0]-tri[0][0])*as_y-(tri[1][1]-tri[0][1])*as_x) > 0);

      if(((tri[2][0]-tri[0][0])*as_y-(tri[2][1]-tri[0][1])*as_x > 0) == s_ab) return(false);

      if(((tri[2][0]-tri[1][0])*(p[1]-tri[1][1])-(tri[2][1]-tri[1][1])*(p[0]-tri[1][0]) > 0) != s_ab) return(false);

      return(true);
   }


   function quadcheck(quad,p){
      return(tricheck([
                     [quad[0],quad[1]],
                     [quad[2],quad[3]],
                     [quad[4],quad[5]],
                  ],p) ||
            tricheck([
                     [quad[4],quad[5]],
                     [quad[6],quad[7]],
                     [quad[0],quad[1]],
                  ],p));
   }


   function boxcheck(b,p){
      return(p[0]>b[0] && p[1]>b[1] && p[0]-b[0]<b[2] && p[1]-b[1]<b[3]);
   }


   function quadquadcheck(quad,b){
      return(
         boxcheck(b,[quad[0],quad[1]])||
         boxcheck(b,[quad[2],quad[3]])||
         boxcheck(b,[quad[4],quad[5]])||
         boxcheck(b,[quad[6],quad[7]])||

         quadcheck(quad,[b[0],b[1]])||
         quadcheck(quad,[b[0]+b[2],b[1]])||
         quadcheck(quad,[b[0],b[1]+b[3]])||
         quadcheck(quad,[b[0]+b[2],b[1]+b[3]])
      );
   }


   function linelineintersect(A,B,C,D){
      // Line AB represented as a1x + b1y = c1
      var a1 = B[1] - A[1];
      var b1 = A[0] - B[0];
      var c1 = a1*(A[0]) + b1*(A[1]);

      // Line CD represented as a2x + b2y = c2
      var a2 = D[1] - C[1];
      var b2 = C[0] - D[0];
      var c2 = a2*(C[0])+ b2*(C[1]);

      var determinant = a1*b2 - a2*b1;

      if (Math.abs(determinant) < .0001){
         return(0);
      }
      else{
         var x = (b2*c1 - b1*c2)/determinant;
         var y = (a1*c2 - a2*c1)/determinant;
         return([x, y]);
      }
   }


   function blurmap(m,mw,x,y,rad){
      var mul = 1;

      var w = rad*2+1;
      var w2 = w*w;

      var ret = m[x+y*mw];

      for(var iy=y-rad;iy<y+rad+1;iy++){
         var tiy = iy * mw;
         for(var ix=x-rad;ix<x+rad+1;ix++){
            var ti = ix+tiy;
            if((ix || iy) && m[ti]){
               ret+=m[ti];//*(1-clamp(length2d([ix,iy])/rad,0,1));
            }
         }
      }

      return(ret/w2);
   }
